import {useMemo, useRef} from "react";

export interface GradientDividerProps {
    color?: string;
}

export const GradientDivider = (props: GradientDividerProps) => {

    const color = useMemo(() => props.color ?? "cyan", [props.color]);

    return (
        <hr style={{transition:"all 1s", background: `linear-gradient(to right, rgba(0, 0, 0, 0), ${props.color ?? "cyan"}, rgba(0, 0, 0, 0))`, border: "none", height: "1px", width: "100%"}}></hr>
    );
}