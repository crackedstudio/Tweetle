import { ClipLoader } from "react-spinners";
import HomeHeroSection from "../dashboard/HomeHeroSection";

interface FullPageConnect {
    handler: () => void;
    isLoading: boolean;
}
const FullPageConnect = ({ handler, isLoading }: FullPageConnect) => {
    return (
        <div className="flex flex-col px-5 items-center justify-center text-white mt-[40%]">
            <HomeHeroSection isNavbarActive={false} />
            <button
                className="bg-black block rounded-full w-[90%] mx-auto py-4 mt-8 "
                onClick={handler}
            >
                <div className="flex space-x-3 items-center justify-center">
                    {!isLoading && (
                        <>
                            <svg
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                            >
                                <rect
                                    x="0.5"
                                    width="24"
                                    height="24"
                                    fill="url(#pattern0_2938_8076)"
                                />
                                <defs>
                                    <pattern
                                        id="pattern0_2938_8076"
                                        patternContentUnits="objectBoundingBox"
                                        width="1"
                                        height="1"
                                    >
                                        <use
                                            xlinkHref="#image0_2938_8076"
                                            transform="scale(0.0357143)"
                                        />
                                    </pattern>
                                    <image
                                        id="image0_2938_8076"
                                        width="28"
                                        height="28"
                                        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAHKADAAQAAAABAAAAHAAAAABkvfSiAAABzUlEQVRIDb1WsU7DMBC9M0UqOyyFBUa+ARAT/wApI39QpBKJCQkq0V9gooW9IwsS8B0w0QV2KjXqcTZJSGo7vlSILHXu3r0X38vVAfjnC6V6dBURYycefBPPhiKuhofAF276EtK4kgDp4ngzhJNgNIdIEJZoIyQowogFkXaCghKMWBDgICgowwhbCrAvEJRgwoLUi44EYgYiwYZfGoITqSAIsJXDSv3DVZiqD7GgBi7P1rBz/+mrqd7hVN34Cr3xQI13h2aQG7NXL3FVIlFbeH775oL4d9iYvbgKRLGKWqcg9drXTNwSkbtBrZTDylotpcv2LiA9WchFAoR7GA+ei6UlwRq+jVOScBfm/MwFa40AP7kRlHaiMCrGQ7Mz+byNdJvSVo2K7fKumTs7vrCmZxM+2VeKxPwl8MX3soOZO6P4BXkoElSuE7Vt5V0xC5QGWEsBoeToAUCIXMNsYpzzaZTirKWMF4j9UmL+hvPYHd7Nh7N7k5NwaO+zIvbindf2a27EBqcZrurXDDtRx4EZs/frOv77T5Mo+zOihpgmwy4/mGunBe5cMPUn1oXm0p5pgprXj2jJ09jlfU7LrX00o5JHFltoDs21WPUfVn0D2ambpwsqQ38AAAAASUVORK5CYII="
                                    />
                                </defs>
                            </svg>
                            <p>Connect wallet</p>
                        </>
                    )}
                    {isLoading && <ClipLoader color="#fff" size={13} />}
                </div>
            </button>
        </div>
    );
};

export default FullPageConnect;
