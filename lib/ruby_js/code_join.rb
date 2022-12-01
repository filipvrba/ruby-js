require "json_parser"

module RubyJS
  FileS = Struct.new :path, :content, :class_rid

  class CodeJoin
    FILE_N = "FILE_N"
    TEST_N = "test.rjs"
    FILE_HN = ".codejoin"

    attr_reader :json_cj

    def initialize path_s
      @files = []

      @json_cj = JsonParser.new File.join(path_s, FILE_HN)
      @json_cj.on :name, "project"
      @json_cj.on :ignore, ["#{FILE_N}_.*.rjs", TEST_N, "main.rjs"]
    end

    def add_file path_f
      content = File.open(path_f).read
      i_c = content.index /class/
      i_n = content.index(/\n/, i_c) if i_c
      @files << FileS.new(path_f, content, [i_c, i_n])
    end

    def get_ignore_r
      result = ""
      @json_cj.parse(:ignore).each do |i|
          result << i.sub(/#{FILE_N}/, @json_cj.parse(:name).downcase.gsub(' ', '_')).concat("$|")
      end
      return result.sub(/\|$/, '')
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
          if f.class_rid[0]
            r_class = f.content[f.class_rid[0], f.class_rid[1] - f.class_rid[0]]
            if r_class.index("class #{c}")
              files_c << f
              break
            end
          end
        end
      end

      return files_c + files_nc
    end

    def extends_pos_class hash
      fe_arr = []  # Extend class
      fa_arr = []  # No extend class
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

      last_class = check_last_extend_class(fe_arr)

      fe_arr_ue = []
      fe_arr.each do |cs|
        cs.each do |c|
          fe_arr_ue << c
        end
      end
      fe_arr_uniq = change_extend_class_position(last_class, fe_arr_ue.uniq)

      return fa_arr.clone.concat(fe_arr_uniq)
    end

    def change_extend_class_position last_class, fe_arr_uniq
      last_class.each do |c|
        i_c = fe_arr_uniq.delete c
        fe_arr_uniq.push c
      end
      return fe_arr_uniq
    end

    def check_last_extend_class fe_arr
      last_class = []
      fe_arr.each do |cs|
        unless last_class.empty?
          last_class.each do |c|
            is_exist = cs.find_index(c)
            if is_exist
              last_class.delete(c)
            end
          end
        end

        if cs.length == 1
          last_class << cs[0]
        end
      end
      return last_class
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
