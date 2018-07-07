import { css } from "react-emotion";
import { colors } from "@src/theme";

export const selectWrapper = css({
  marginBottom: 20
});

export const selectInputStyle = css({
  pointerEvents: "none"
});

export const dropDownClass = css({
  marginTop: -20
});

export const inputWrapper = css({
  cursor: "pointer",
  position: "relative"
});

export const chevronStyle = css({
  position: "absolute",
  top: 25,
  right: 7,
  color: colors.gray.base,
  fontSize: 12,
  "&.__pebble__select__open": {
    transform: "rotate(180deg)"
  }
});
