require "json_parser"

module RubyJS
  FileS = Struct.new :path, :content, :class_rid

  class CodeJoin
    attr_reader :json_cj

    def initialize path_s
      @files = []

      @json_cj = JsonParser.new File.join(path_s, ".codejoin")
    end

    def add_file path_f
      content = File.open(path_f).read
      i_c = content.index /class/
      i_n = content.index(/\n/, i_c) if i_c
      @files << FileS.new(path_f, content, [i_c, i_n])
    end

    def get_pos_class
      files_ch = {}
      files_nc = []
      @files.each do |f|
        if f.class_rid[0]
          r_class = f.content[f.class_rid[0], f.class_rid[1] - f.class_rid[0]]
          r_class_s = r_class.split(' ')
          _class = r_class_s[1]
          _super = r_class_s[3]

          files_ch[_class] = _super
        else
          files_nc << f
        end
      end

      files_c = []
      extends_pos_class(files_ch).each do |c|
        @files.each do |f|
          r_class = f.content[f.class_rid[0], f.class_rid[1] - f.class_rid[0]]
          if r_class.index("class #{c}")
            files_c << f
            break
          end
        end
      end
      
      return files_c + files_nc
    end

    def extends_pos_class hash
      fe_arr = []
      fa_arr = []
      hash.each do |c, e|
        if e
          arr_c = [c, e]
          def e_loop hash, key
            k = hash.dig(key)
            if k
              yield k
              e_loop(hash, k) do |kk|
                yield kk
              end
            end
          end
          e_loop(hash, e) do |k|
            arr_c << k
          end

          arr_c.pop
          fe_arr << arr_c.reverse
        else
          fa_arr << c
        end
      end

      fe_arr_u = fe_arr.group_by{|x|x[1]}.values.map(&:last).reverse 
      return fa_arr.clone.concat(fe_arr_u).to_s.gsub(/[\[\]\"]/, '').split(', ')
    end

    def to_s
      result = ""
      # " * Module Description" +
      # " *" +
      # " * @version #{}" +
      # " * @date #{}" +
      # " * @author #{}" +
      # " * @remarks #{}" +
      # " * @github #{}" +
      # " */"

      get_pos_class.each do |f_s|
        content_e = f_s.content.gsub(/import.*\n/, '').gsub('export ', '').gsub('default ', '')
        content_en = content_e[content_e.length - 1] == "\n" ? content_e : content_e.concat("\n")
        result << content_en
      end
      return result
    end
  end
end
