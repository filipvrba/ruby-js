export default class ElmContent < HTMLElement
  def initialize
    super
    
    init_elm()
  end

  def connectedCallback()
  end

  def disconnectedCallback()
  end

  def init_elm()
    l_sidebar_item = lambda do 
      li_dom = """
      <li class='nav-item'>
        <a class='nav-link active' href='#'>Getting Started</a>
      </li>
      """
    end

    template = """
    <div class='container-fluid'>
      <div class='row'>
        <!-- Sidebar -->
        <div class='col-md-3 col-lg-2'>
          <nav class='sidebar'>
            <ul class='nav flex-column'>
              #{l_sidebar_item()}
              <li class='nav-item'>
                  <a class='nav-link' href='#'>Installation</a>
              </li>
              <li class='nav-item'>
                  <a class='nav-link' href='#'>Usage</a>
              </li>
              <li class='nav-item'>
                  <a class='nav-link' href='#'>API Reference</a>
              </li>
              <li class='nav-item'>
                  <a class='nav-link' href='#'>Examples</a>
              </li>
            </ul>
          </nav>
        </div>

        <div class='col-md-9 col-lg-10'>
          <elm-main-content></elm-main-content>
        </div>
      </div>
    </div>
    """

    self.innerHTML = template
  end
end