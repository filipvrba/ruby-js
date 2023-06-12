module RJSV
  module Watch
    require "listen"

    module_function

    def modified_files(path, &block)
      listener = Listen.to(path,
        only: /\..*\.#{Constants::SUFFIX_RB}$/
      ) do |m, a, r|
        
        block.call(m, a, r) if block
      end
      listener.start
      sleep
    end
  end
end