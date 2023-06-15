module RJSV
  module Plugins
    module Docs
      module Generate
        module_function

        def comments_with_keywords(content)
          result = []
          content = content.lines(chomp: true).join('><')

          indexs_comments = Docs::Core::Content.indexs(content, '##><', false)
          index_module = Docs::Core::Content.indexs(content, "module\s.*?><").max
          indexs_defs = Docs::Core::Content.indexs(content, "def\s(.*?)><")
          
          if index_module
            if !indexs_comments.empty? && index_module < indexs_comments[0]
              index_module = Docs::Core::Content.indexs(content, "class\s[^>]*><").first
            end
             
            indexs_defs = indexs_defs.prepend(index_module)
          end

          unless indexs_comments.empty? &&
                 indexs_defs.empty?
              if indexs_comments.length == indexs_defs.length
                indexs_comments.length.times do |i|
                comments_raw = content[indexs_comments[i], indexs_defs[i] - indexs_comments[i]]
                              .gsub(/><\s*/, ' ')
                              .gsub(/#( ?)/, '')
                              .strip
                comments_split = comments_raw.scan(/^(.*)\s\s(.*)$/).last
                result << comments_split
              end
            end
          end

          return result
        end

        def comments_with_keywords_api(comments_with_keywords)
          api = []
          comments_with_keywords.each do |comment_with_k|
            keyword_split = comment_with_k[1].split(' ')
            api << {
              comment: comment_with_k[0],
              keyword: keyword_split.first,
              name: keyword_split.keep_if.with_index {|_,i| i > 0}.join(' ')
            }
          end
          return api
        end

        def docs_api(input_path)
          files = Dir.glob File.join(input_path, '**', '*.rb')
          # files = ['/home/filip/Documents/code/ruby-js/lib/rjsv/plugin.rb']
          api = []

          files.each do |path_file|
            content = RJSV::Core::Files.open(path_file)
            if content
              comments_with_k = comments_with_keywords(content)
              comments_api = comments_with_keywords_api(comments_with_k)

              unless comments_api.empty?
                content_hash = {
                  file: File.basename(path_file),
                  path: File.dirname(path_file).sub(File.join(ROOT, ''), ''),
                  comments_with_keywords: comments_api,
                }
                
                api << content_hash
              end
            end
          end

          return api
        end
      end#Generate
    end
  end
end