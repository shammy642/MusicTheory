import React from "react";
import "./star.scss"
import { Box } from "@mui/material";

type starButtonProps = {
    color: string;
    children: React.ReactNode;
}

export const Star = ({ color, children }: starButtonProps) => {
    return (
        <Box className="star">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 210">
                <polygon points="105,0 131,68 200,75 150,115 162,185 105,150 48,185 60,115 10,75 79,68" fill={color} />
                <text x="105" y="105" fontFamily="Arial" fontSize="70" textAnchor="middle" dominantBaseline="middle" fill="white">{children}</text>
            </svg>
        </Box>
    );
}
