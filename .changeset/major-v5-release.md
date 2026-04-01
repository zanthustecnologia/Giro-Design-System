---
"@giro-ds/react": major
---

BREAKING CHANGE: Calendar migrated to react-day-picker; Dropdown deprecated and removed from exports; Filter API refactored

- **Calendar**: Replaced custom implementation with react-day-picker v9, removed internal type exports (DayItem, EmptyItem, CalendarItem, YearItem), renamed `selectedDate` to `selected`, `currentDate` now optional
- **Dropdown**: Component deprecated and moved to .deprecated/, removed from public exports  
- **Filter**: Replaced Dropdown with Popover internally, changed `position` prop to `side` + `align`, replaced `DropdownItem[]` with `FilterItem[]`
- **Drawer**: Added new optional `headerContent` prop
- **DatePicker**: Updated to use new Calendar API with `selected` prop
- **TextArea**: New component with full form support (label, validation, character counter, resize control)
- **TextField**: Added new `error` prop for external validation control
- **Tests**: Fixed Avatar, Dialog, and Toast test suites after v4.0.0 breaking changes
