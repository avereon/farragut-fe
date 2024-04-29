import {ApplicationColors} from "../ApplicationColors";

export interface GradientDividerProps {
    color?: string;
}

export const GradientDivider = (props: GradientDividerProps) => {

    return (
        <hr style={{background: `linear-gradient(to right, rgba(0, 0, 0, 0), ${props.color ?? ApplicationColors.primary}, rgba(0, 0, 0, 0))`, border: "none", height: "1px", width: "100%"}}></hr>
    );
}