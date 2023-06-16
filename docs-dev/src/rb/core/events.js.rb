export default class Events
  def self.send(event, data = nil)
    event = new CustomEvent(event, {
      detail: data
    })
    document.dispatchEvent(event)
  end
end

window.Events = Events