import PlayerStrip from "../components/ui/PlayerStrip";
import { dummyPlayers } from "../utils/data";
import readingOwl from "../assets/reading-owl.png";
import { useEffect, useState } from "react";
import { h4 } from "framer-motion/client";

export default function Friends() {

    const [friends, setFriends] = useState<{message: String, data:[{}]}>();

    useEffect(() => {
        const fetchData = async () => {
            let response = await fetch('https://tweetle-bot-backend.onrender.com/player/referred-by/REF-2200639342', {

            })

            let data = await response.json();

            setFriends(data)
        }

        fetchData()

    }, [])

    console.log(friends)

    return (
        <div>
            <div className="pt-[40px] pb-6 flex flex-col items-center bg-gradient-svg">
                <img src={readingOwl} className="w-[90px]" alt="" />
                {friends && friends?.data.length > 0 ? <h1>
                    {friends?.data.length} Hatchling in your nest
                </h1> :<h1 className="text-[28px] leading-5 font-bold mb-4">
                    Your Nest is empty
                </h1>}
                <h4 className="text-[18px] leading-5 font-medium text-[#F5F5F6B2]">
                    Invite friends and earn rewards
                </h4>
            </div>
            <div
                className={`${
                    dummyPlayers.length > 0 ? "" : "pt-[200px]"
                } bg-black flex flex-col h-screen`}
            >
                <div className="py-[37px] px-[24px] bg-[#0A0B0F]">
                    <button className="py-[14px] bg-[#F5F5F5] rounded-[12px] w-full text-[15px] leading-5 font-medium text-black">
                        Invite a Friend
                    </button>
                </div>
                {friends && friends?.data.length > 0 && (
                    <div className="flex flex-col gap-y-6 p-6">
                        {friends?.data
                            .map((player, i) => {
                                return { ...player, position: i + 1 };
                            })
                            .map((player) => (
                                <PlayerStrip
                                    player={{...player, position: 1}}
                                    showPosition={false}
                                />
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}
