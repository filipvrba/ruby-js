module RJSV
  module Plugins
    module Markdown
      module Parser
        require 'redcarpet'

        module_function
        
        def render_html(content_markdown)
          parser = Redcarpet::Markdown.new(Redcarpet::Render::HTML)
          parser.render(content_markdown)
        end
      end
    end
  end
end