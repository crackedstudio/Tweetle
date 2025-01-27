import PlayerStrip from "../components/ui/PlayerStrip";
import { dummyPlayers } from "../utils/data";
import readingOwl from "../assets/reading-owl.png";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import InviteModal from "../components/modal/InviteModal";

export default function Friends() {
    const [friends, setFriends] = useState<[{}]>();
    const [inviteModal, setInviteModal] = useState(false);
    const [copyStatus, setCopyStatus] = useState(false);

    const callToast = (msg: string) => {
        return toast(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    };

    const handleCopy = async () => {
        try {
            const userTgId = localStorage.getItem("tg_id");
            const referralLink = `https://t.me/tweetle_bot?start=REF-${userTgId}`;

            await navigator.clipboard.writeText(referralLink);
            setCopyStatus(true);
            callToast("Copied link to clipboard");

            // Reset the copy status after 2 seconds
            setTimeout(() => {
                setCopyStatus(false);
            }, 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
            callToast("Link copying failed");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const userTgId = localStorage.getItem("tg_id");
            try {
                let response = await fetch(
                    `https://tweetle-bot-backend.onrender.com/player/referred-by/REF-${userTgId}`,
                    {}
                );

                let data = await response.json();

                console.log("GOTTEN FRIENDS DATA IS ----------", data);
                if (data.data) setFriends(data.data);
                if (!data.data) callToast(data.message);
            } catch (err) {
                callToast("Error fetching referee data ❌🔺 , Try Again 🔁🔁");
                console.log("error fetching data: ", err);
            }
        };

        fetchData();
    }, []);

    console.log(friends);

    return (
        <div>
            <div className="pt-[40px] pb-6 flex flex-col items-center bg-gradient-svg">
                <img src={readingOwl} className="w-[90px]" alt="" />
                {friends && friends?.length > 0 ? (
                    <h1 className="font-bold text-3xl">
                        {friends?.length} Active Nesters
                    </h1>
                ) : (
                    <h1 className="text-[28px] leading-5 font-bold mb-4">
                        Your Nest is empty
                    </h1>
                )}
                <h4 className="text-[18px] leading-5 font-medium text-[#F5F5F6B2] mt-2">
                    Invite friends and earn rewards
                </h4>
            </div>
            <div
                className={`${
                    dummyPlayers.length > 0 ? "" : "pt-[200px]"
                } bg-black flex flex-col h-screen`}
            >
                <div className="py-[37px] px-[24px] bg-[#0A0B0F]">
                    <button
                        className="py-[14px] bg-[#F5F5F5] rounded-[12px] w-full text-[15px] leading-5 font-medium text-black"
                        onClick={() => setInviteModal(true)}
                    >
                        Invite a Friend
                    </button>
                </div>
                {friends && friends?.length > 0 && (
                    <div className="flex flex-col gap-y-6 p-6">
                        {friends
                            ?.map((player, i) => {
                                return { ...player, position: i + 1 };
                            })
                            .map((player) => (
                                <PlayerStrip
                                    player={{ ...player, position: 1 }}
                                    showPosition={false}
                                />
                            ))}
                    </div>
                )}
            </div>
            <InviteModal
                isOpen={inviteModal}
                cancelHandler={() => setInviteModal(false)}
                copyHandler={handleCopy}
                copyStatus={copyStatus}
            />
        </div>
    );
}
