class OptionParser

	LEFT = 2
	MIDDLE = 22

    attr_reader :args

    def self.parse(args = ARGV)
        parser = OptionParser.new
        yield parser
        parser.process args
        parser
    end

    def self.last_arg(args = ARGV)
        args.length >= 1 ? args[args.length - 1] : nil
    end

    def initialize(args = ARGV)
        @args = args
        @banner = nil
        @flags = Array.new
    end

    def banner(banner)
        @banner = banner
    end

    def on(short_flag, long_flag, description, &block)
        @flags << { short_flag: short_flag || '', long_flag: long_flag || '',
            description: description || '', block: block }
    end

    def process( args = ARGV )
        args.each_with_index do |arg, i|
            @flags.each do |flag|
                name = -> (type_flag) do
                    flag[type_flag].gsub( /[a-z -]/, '' )
                end

                flag_strip = -> (type_flag) do
					flag[type_flag].sub( name.(type_flag), '' ).strip()
				end
                has_flag = -> (type_flag) { arg == flag_strip.(type_flag) }

                if has_flag.(:short_flag) or
                   has_flag.(:long_flag)

                    has_name = -> (type_flag) do
						name.(type_flag) != ""
					end
                    value = nil

                    if has_name.(:short_flag) or
                       has_name.(:long_flag)
                        value = args[i + 1]
                    end

                    flag[:block].call( value )
                end
            end
        end
    end

    def self.get_empty_spaces
        " " * (MIDDLE + LEFT)
    end

    def to_s()
        io = Array.new
        if banner = @banner
            io << banner
            io << "\n"
        end
        
        @flags.each do |flag|
            l_flag = !flag[:long_flag].empty? ? ", #{flag[:long_flag]}" : ""
			flags = "#{flag[:short_flag]}#{l_flag}".ljust(MIDDLE)
			desc = flag[:description].gsub("\n", "\n#{OptionParser.get_empty_spaces}")
            io << "".ljust(LEFT) + flags + desc
            io << "\n"
        end

        io.join
    end
end
