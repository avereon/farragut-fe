export interface GradientDividerProps {
    color?: string;
}

export const GradientDivider = (props: GradientDividerProps) => {

    return (
        <hr style={{transition:"all 1s", background: `linear-gradient(to right, rgba(0, 0, 0, 0), ${props.color ?? "#2e9494"}, rgba(0, 0, 0, 0))`, border: "none", height: "1px", width: "100%"}}></hr>
    );
}