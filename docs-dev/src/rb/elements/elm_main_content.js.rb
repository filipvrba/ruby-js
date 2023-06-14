export default class ElmMainContent < HTMLElement
  def initialize
    super
    
    init_elm()
  end

  def connectedCallback()
  end

  def disconnectedCallback()
  end

  def init_elm()
    template = """
      <h1>Getting Started</h1>
      <p>Welcome to the documentation.</p>
    """

    self.innerHTML = template
  end
end