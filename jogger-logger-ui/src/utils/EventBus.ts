interface EventMap {
  [eventName: string]: Function[];
}

class EventBus {
  events: EventMap = {};

  subscribe(eventName: string, callback: Function) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(callback);
  }

  unsubscribe(eventName: string, callback: Function) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter((fn) => fn !== callback);
    }
  }

  emit(eventName: string) {
    this.events[eventName].forEach((callback) => {
      callback();
    });
  }
}

export const eventBus = new EventBus();

export const COOKIE_SET = 'cookie-set';
