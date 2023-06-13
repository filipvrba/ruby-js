export default class ElmNAME_CLASS < HTMLElement
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
    """

    self.innerHTML = template
  end
end