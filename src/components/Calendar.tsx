import * as React from "react";
import RCalendar from "react-calendar/dist/entry.nostyle";
import { css, cx } from "react-emotion";
import { CalendarProps } from "@src/components/typings/Calendar";
import {
  dateStyle,
  tileStyle,
  wrapperStyle
} from "@src/components/styles/Calendar.styles";
import { mixins } from "@src/theme";
import Button from "@src/components/Button";

class Calendar extends React.PureComponent<CalendarProps> {
  static defaultProps = {
    onChange: () => {}
  };

  state = {
    value: this.props.selected
  };

  private onChange = value => {
    this.setState(
      {
        value
      },
      () => this.props.onChange(value)
    );
  };

  render() {
    const {
      range,
      selected,
      hideShadow,
      className,
      onApply,
      onClear
    } = this.props;

    return (
      <div
        className={cx(
          wrapperStyle,
          {
            [css({ boxShadow: "none" })]: hideShadow
          },
          className
        )}
      >
        <RCalendar
          onChange={this.onChange}
          selectRange={range}
          view="month"
          value={selected}
          next2Label={null}
          prev2Label={null}
          tileClassName={tileStyle}
          className={dateStyle}
          showNeighboringMonth={false}
          prevLabel={
            <i style={{ fontSize: 16 }} className="icon-chevron-left" />
          }
          nextLabel={
            <i style={{ fontSize: 16 }} className="icon-arrow-right" />
          }
        />

        {onClear &&
          onApply && (
            <div style={{ ...mixins.flexSpaceBetween, marginTop: 20 }}>
              {onClear && (
                <Button type="secondary" onClick={onClear}>
                  Clear
                </Button>
              )}
              {onApply && (
                <Button
                  type="primary"
                  onClick={() => onApply(this.state.value)}
                >
                  Apply
                </Button>
              )}
            </div>
          )}
      </div>
    );
  }
}

export default Calendar;
