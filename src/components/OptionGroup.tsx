import * as React from "react";
import { optionsWrapper } from "./styles/Options.styles";
import { OptionProps } from "./typings/Option";
import { getSelectedCheckboxes } from "./utils/getSelectedCheckboxes";
import * as ReactDOM from "react-dom";
import { OptionGroupProps, OptionGroupState } from "./typings/OptionGroup";
import scrollIntoView from "scroll-into-view-if-needed";

export default class OptionGroup extends React.PureComponent<
  OptionGroupProps,
  OptionGroupState
> {
  optionRef: React.RefObject<HTMLDivElement> = React.createRef();

  state = {
    selected: 0
  };

  private handleKeyPress = (e: KeyboardEvent) => {
    const { children } = this.props;
    const { selected } = this.state;

    if (e.which === 13) {
      // @ts-ignore
      this.handleChange(children[selected].props);
    }

    this.setState(
      () => {
        let _selected = selected;
        if (e.which === 40) {
          e.preventDefault();
          _selected = Math.min(
            _selected + 1,
            React.Children.count(children) - 1
          );
        }
        if (e.which === 38) {
          e.preventDefault();
          _selected = Math.max(_selected - 1, 0);
        }

        return { selected: _selected };
      },
      () => {
        if (this.optionRef.current && (e.which === 40 || e.which === 38)) {
          scrollIntoView(
            ReactDOM.findDOMNode(
              this[`option-ref-${selected}`].current
            ) as Element,
            {
              behavior: "smooth",
              boundary: this.optionRef.current
            }
          );
        }
      }
    );
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleChange = ({ value, checked }) => {
    const { multiSelect, onChange, selected } = this.props;

    if (multiSelect) {
      // @ts-ignore
      onChange(getSelectedCheckboxes(value, selected), this.props);
    } else {
      onChange(checked ? value : undefined, this.props);
    }
  };

  private isSelected = value => {
    const { multiSelect, selected } = this.props;
    // @ts-ignore
    return multiSelect ? selected.indexOf(value) >= 0 : selected === value;
  };

  render() {
    const _children = React.Children.map(
      this.props.children,
      (option: React.ReactElement<OptionProps>, i) => {
        this[`option-ref-${i}`] = React.createRef();
        return React.cloneElement(option, {
          onChange: this.handleChange,
          isActive: this.state.selected === i,
          isSelected: this.isSelected(option.props.value),
          multiSelect: this.props.multiSelect,
          // @ts-ignore
          ref: this[`option-ref-${i}`]
        });
      }
    );

    return (
      <div ref={this.optionRef} className={optionsWrapper}>
        {_children}
      </div>
    );
  }
}