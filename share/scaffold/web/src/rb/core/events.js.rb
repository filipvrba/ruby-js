export default class Events
  def self.emit(dom, event, values = nil)
    custom_event = new CustomEvent(event, {
      detail: {
        value: values
      }
    })

    document.query_selector(dom).dispatch_event(custom_event)
  end

  def self.connect(dom, event, &callback)
    document.query_selector(dom).add_event_listener(event, callback) if callback
  end

  def self.disconnect(dom, event, &callback)
    document.query_selector(dom).remove_event_listener(event, callback) if callback
  end
end
window.Events = Events
