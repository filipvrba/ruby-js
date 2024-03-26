export default class Net
  def self.curl(url, &callback)
    fetch(url)
    .then(lambda do |response|
      response.text()
    end)
    .then(lambda do |text|
      callback(text) if callback
    end)
  end
end
window.Net = Net
