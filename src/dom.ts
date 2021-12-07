export interface EventHandler<T, E extends Event> {
  (e: E & { currentTarget: T; target: Element }): void
}
export interface DOMAttributes<T> {
  onabort?: EventHandler<T, Event>
  onanimationend?: EventHandler<T, AnimationEvent>
  onanimationiteration?: EventHandler<T, AnimationEvent>
  onanimationstart?: EventHandler<T, AnimationEvent>
  onblur?: EventHandler<T, FocusEvent>
  oncanplay?: EventHandler<T, Event>
  oncanplaythrough?: EventHandler<T, Event>
  onchange?: EventHandler<T, Event>
  onclick?: EventHandler<T, MouseEvent>
  oncompositionend?: EventHandler<T, CompositionEvent>
  oncompositionstart?: EventHandler<T, CompositionEvent>
  oncompositionupdate?: EventHandler<T, CompositionEvent>
  oncontextmenu?: EventHandler<T, MouseEvent>
  oncopy?: EventHandler<T, ClipboardEvent>
  oncut?: EventHandler<T, ClipboardEvent>
  ondblclick?: EventHandler<T, MouseEvent>
  ondrag?: EventHandler<T, DragEvent>
  ondragend?: EventHandler<T, DragEvent>
  ondragenter?: EventHandler<T, DragEvent>
  ondragexit?: EventHandler<T, DragEvent>
  ondragleave?: EventHandler<T, DragEvent>
  ondragover?: EventHandler<T, DragEvent>
  ondragstart?: EventHandler<T, DragEvent>
  ondrop?: EventHandler<T, DragEvent>
  ondurationchange?: EventHandler<T, Event>
  onemptied?: EventHandler<T, Event>
  onencrypted?: EventHandler<T, Event>
  onended?: EventHandler<T, Event>
  onerror?: EventHandler<T, Event>
  onfocus?: EventHandler<T, FocusEvent>
  ongotpointercapture?: EventHandler<T, PointerEvent>
  oninput?: EventHandler<T, InputEvent>
  onkeydown?: EventHandler<T, KeyboardEvent>
  onkeypress?: EventHandler<T, KeyboardEvent>
  onkeyup?: EventHandler<T, KeyboardEvent>
  onload?: EventHandler<T, Event>
  onloadeddata?: EventHandler<T, Event>
  onloadedmetadata?: EventHandler<T, Event>
  onloadstart?: EventHandler<T, Event>
  onlostpointercapture?: EventHandler<T, PointerEvent>
  onmousedown?: EventHandler<T, MouseEvent>
  onmouseenter?: EventHandler<T, MouseEvent>
  onmouseleave?: EventHandler<T, MouseEvent>
  onmousemove?: EventHandler<T, MouseEvent>
  onmouseout?: EventHandler<T, MouseEvent>
  onmouseover?: EventHandler<T, MouseEvent>
  onmouseup?: EventHandler<T, MouseEvent>
  onpaste?: EventHandler<T, ClipboardEvent>
  onpause?: EventHandler<T, Event>
  onplay?: EventHandler<T, Event>
  onplaying?: EventHandler<T, Event>
  onpointercancel?: EventHandler<T, PointerEvent>
  onpointerdown?: EventHandler<T, PointerEvent>
  onpointerenter?: EventHandler<T, PointerEvent>
  onpointerleave?: EventHandler<T, PointerEvent>
  onpointermove?: EventHandler<T, PointerEvent>
  onpointerout?: EventHandler<T, PointerEvent>
  onpointerover?: EventHandler<T, PointerEvent>
  onpointerup?: EventHandler<T, PointerEvent>
  onprogress?: EventHandler<T, Event>
  onratechange?: EventHandler<T, Event>
  onreset?: EventHandler<T, Event>
  onscroll?: EventHandler<T, UIEvent>
  onseeked?: EventHandler<T, Event>
  onseeking?: EventHandler<T, Event>
  onselect?: EventHandler<T, UIEvent>
  onstalled?: EventHandler<T, Event>
  onsubmit?: EventHandler<T, Event & { submitter: HTMLElement }>
  onsuspend?: EventHandler<T, Event>
  ontimeupdate?: EventHandler<T, Event>
  ontouchcancel?: EventHandler<T, TouchEvent>
  ontouchend?: EventHandler<T, TouchEvent>
  ontouchmove?: EventHandler<T, TouchEvent>
  ontouchstart?: EventHandler<T, TouchEvent>
  ontransitionend?: EventHandler<T, TransitionEvent>
  onvolumechange?: EventHandler<T, Event>
  onwaiting?: EventHandler<T, Event>
  onwheel?: EventHandler<T, WheelEvent>
}
export type HTMLAutocapitalize = 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters'
export type HTMLAutocomplete =
  | 'additional-name'
  | 'address-level1'
  | 'address-level2'
  | 'address-level3'
  | 'address-level4'
  | 'address-line1'
  | 'address-line2'
  | 'address-line3'
  | 'bday'
  | 'bday-year'
  | 'bday-day'
  | 'bday-month'
  | 'billing'
  | 'cc-additional-name'
  | 'cc-csc'
  | 'cc-exp'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-family-name'
  | 'cc-given-name'
  | 'cc-name'
  | 'cc-number'
  | 'cc-type'
  | 'country'
  | 'country-name'
  | 'current-password'
  | 'email'
  | 'family-name'
  | 'fax'
  | 'given-name'
  | 'home'
  | 'honorific-prefix'
  | 'honorific-suffix'
  | 'impp'
  | 'language'
  | 'mobile'
  | 'name'
  | 'new-password'
  | 'nickname'
  | 'organization'
  | 'organization-title'
  | 'pager'
  | 'photo'
  | 'postal-code'
  | 'sex'
  | 'shipping'
  | 'street-address'
  | 'tel-area-code'
  | 'tel'
  | 'tel-country-code'
  | 'tel-extension'
  | 'tel-local'
  | 'tel-local-prefix'
  | 'tel-local-suffix'
  | 'tel-national'
  | 'transaction-amount'
  | 'transaction-currency'
  | 'url'
  | 'username'
  | 'work'
export type HTMLCrossorigin = 'anonymous' | 'use-credentials' | ''
export type HTMLDir = 'ltr' | 'rtl' | 'auto'
export type HTMLFormEncType = 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'
export type HTMLFormMethod = 'post' | 'get' | 'dialog'
export type HTMLIframeSandbox =
  | 'allow-downloads-without-user-activation'
  | 'allow-forms'
  | 'allow-modals'
  | 'allow-orientation-lock'
  | 'allow-pointer-lock'
  | 'allow-popups'
  | 'allow-popups-to-escape-sandbox'
  | 'allow-presentation'
  | 'allow-same-origin'
  | 'allow-scripts'
  | 'allow-storage-access-by-user-activation'
  | 'allow-top-navigation'
  | 'allow-top-navigation-by-user-activation'
export type HTMLLinkAs = 'audio' | 'document' | 'embed' | 'fetch' | 'font' | 'image' | 'object' | 'script' | 'style' | 'track' | 'video' | 'worker'
export type HTMLReferrerPolicy =
  | 'no-referrer'
  | 'no-referrer-when-downgrade'
  | 'origin'
  | 'origin-when-cross-origin'
  | 'same-origin'
  | 'strict-origin'
  | 'strict-origin-when-cross-origin'
  | 'unsafe-url'
