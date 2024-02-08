import p5 from "p5";

export interface Segment {
    x: number;
    y: number;
    width: number;
    height: number;
    speedY?: number;
    isVisible?: boolean;
    image: p5.Image;
    update?: () => void;
    display: () => void;
    reset?: () => void;
    collidesWith?: (otherObject: { x: number; y: number; width: number; height: number }) => boolean;
}