interface NeonSpinnerProps {
    firstText: string;
    secondText: string;
}

const NeonSpinner = ({ firstText, secondText }: NeonSpinnerProps) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
            <div className="relative">
                {/* Main circle with glow effect */}
                <div className="relative w-32 h-32">
                    {/* Static outer circle */}
                    <div className="absolute inset-0 rounded-full border border-purple-400 shadow-[0_0_15px_rgba(192,132,252,0.5)]" />

                    {/* Rotating progress circle */}
                    <div className="absolute inset-0">
                        <div className="w-full h-full rounded-full border border-purple-400 animate-spin-slow overflow-hidden">
                            <div className="w-1/2 h-full bg-gradient-to-r from-purple-400/20 to-purple-400/40" />
                        </div>
                    </div>

                    {/* Text overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-white text-sm font-bold tracking-wide bungee-regular">
                            {firstText}
                        </span>
                        <span className="text-white text-sm font-bold tracking-wide bungee-regular">
                            {secondText}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Add custom animation
const styles = `
  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  .animate-spin-slow {
    animation: spin-slow 2s linear infinite;
  }
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default NeonSpinner;
