interface LeaderBoardIconProps {
    color?: string;
}

const LeaderBoardIcon = ({ color = "#787A80" }: LeaderBoardIconProps) => {
    return (
        <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M17.002 10.0023C17.8458 10.0023 18.8198 9.91897 19.301 10.7523C19.502 11.1004 19.502 11.5677 19.502 12.5023V13.5023C19.502 14.4369 19.502 14.9042 19.301 15.2523C18.8198 16.0857 17.8458 16.0023 17.002 16.0023C16.1581 16.0023 15.1841 16.0857 14.7029 15.2523C14.502 14.9042 14.502 14.4369 14.502 13.5023V12.5023C14.502 11.5677 14.502 11.1004 14.7029 10.7523C15.1841 9.91897 16.1581 10.0023 17.002 10.0023Z"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.00195 4.00232C8.84585 4.00232 9.81984 3.91895 10.301 4.75232C10.502 5.10039 10.502 5.5677 10.502 6.50232V13.5023C10.502 14.4369 10.502 14.9042 10.301 15.2523C9.81984 16.0857 8.84585 16.0023 8.00195 16.0023C7.15806 16.0023 6.18406 16.0857 5.70292 15.2523C5.50195 14.9042 5.50195 14.4369 5.50195 13.5023V6.50232C5.50195 5.5677 5.50195 5.10039 5.70292 4.75232C6.18406 3.91895 7.15806 4.00232 8.00195 4.00232Z"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M22.5 20H2.5"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default LeaderBoardIcon;
