export default class ElmFooter < HTMLElement
  def initialize
    super
    
    init_elm()
  end

  def init_elm()
    template = """
    <footer class='py-3'>
      <p class='text-center text-body-secondary mb-0'>Powered by docs plugin. Generated on: #{DOCS_API_GENERATED}</p>
    </footer>
    """

    self.innerHTML = template
  end
end