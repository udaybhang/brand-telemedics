export interface PresetItemModal {
  presetLabel: string;
  range: RangeModal;
}

export interface RangeModal {
  fromDate: Date;
  toDate: Date;
}

export interface CalendarOverlayConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  shouldCloseOnBackdropClick?: boolean;
}

export interface NgxDrpOptionsModal {
  presets: Array<PresetItemModal>;
  format: string;
  range: RangeModal;
  excludeWeekends?: boolean;
  locale?: string;
  fromMinMax?: RangeModal;
  toMinMax?: RangeModal;
  applyLabel?: string;
  cancelLabel?: string;
  animation?: boolean;
  calendarOverlayConfig?: CalendarOverlayConfig;
  placeholder?: string;
  startDatePrefix?: string;
  endDatePrefix?: string;
}
