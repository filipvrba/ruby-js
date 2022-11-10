require "json"
require 'fileutils'

class JsonParser
  attr_reader :db
  
  def initialize path, auto_write = true
    @path = path
    @db = open @path
    @auto_write = auto_write
  end

  def on symbol, value
    unless @db.include?(symbol.to_s)
      parse symbol, value
    end
  end

  def parse symbols, value = nil, delete = nil
    symbols_join = ""
    if symbols.class.name == "Array"
      symbols_join = symbols.join("\"][\"")
    else
      symbols_join = symbols.to_s
    end
    symbols_join = "[\"#{symbols_join}\"]"

    unless delete
      unless value
        eval "@db#{ symbols_join }"
      else
        eval "@db#{ symbols_join } = value"
        
        if @auto_write
          write @path, @db
        end
      end
    else
      if symbols
        eval "@db#{ symbols_join }.delete('#{delete}')"
      else
        eval "@db.delete('#{delete}')"
      end

      if @auto_write
        write @path, @db
      end
    end
  end

  def exist?
    @db.empty?
  end

  def delete key, symbols = nil
    parse(symbols, nil, key)
  end

  private
  def open path
    begin
      result = String.new
      File.open path do |f|
        result = JSON.parse f.read
      end

      return result
    rescue
      return Hash.new
    end
  end

  def write path, db
    begin
      create_dir path do 

        f = File.new path, "w"
        f.write JSON.pretty_generate db
        f.close
      end
    end
  end

  def create_dir path, &callback
    begin
      dir_path = File.dirname path
      unless Dir.exist? dir_path
        FileUtils.mkpath dir_path
      end

      callback.call
    rescue
      
    end
  end
end
