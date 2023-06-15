module RJSV
  module Plugins
    module Docs
      module Core
        module Content
          module_function

          def indexs(content, keyword, is_add = true)
            content_sub = String.new(content)
            indexs = []
            while true
              index = content_sub.index(/#{keyword}/)
              if index
                content_sub.sub!(/#{keyword}/) do |s|
                  length_add = is_add ? s.length : 0
                  indexs << index + length_add
                  "_" * s.length
              end
              else
                break
              end
            end
            return indexs
          end
        end#Content
      end
    end
  end
end