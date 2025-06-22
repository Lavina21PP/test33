"use client";

import { useEffect, useRef, useState } from "react";
import {
  Eye,
  Globe,
  Mic,
  MicVocal,
  SwitchCamera,
  Link,
  UserRoundPlus,
  Users,
  MessageCircle,
} from "lucide-react";

export default function FakeLive() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [viewers, setViewers] = useState(0);
  const [comments, setComments] = useState<
    Array<{ id: number; name: string; message: string; avatar: string }>
  >([]);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("เปิดกล้องไม่ได้", err);
      }
    };

    const fakeComments = [
      "ມີຫຼາຍສີບໍ?",
      "FC ❤️",
      "ລາຄາເທົ່າໃດ",
      "3ອັນ 5ພັນໄດ້ບໍ",
      "ສົ່ງໃຫ້ມື້ໃດ?",
      "ຕິດຕໍ່ແນວໃດ",
      "ບໍ່ແຊບສົ່ງຄືນເດີ",
      "ສະບາຍດີ",
      "ມີເຮືອດຳນ້ຳຂາຍບໍ?",
      "ມີຍົນຂາຍບໍ",
      "ພໍ່ຄ້າອາຍຸທໍ່ໃດ",
      "ມີແບບໃດແດ່",
      "ສົນໃຈ 3ອັນ",
      "ສົນໃຈ",
      "ແວັກໃສ່ຜົມລາຄາທໍ່ໃດ",
      "ສົນໃຈແວັກໃສ່ຜົມ",
      "ແວັກໃສ່ຜົມມີສີຫຍັງແດ່",
      "ພໍ່ຄ້າຫຼາຍໃຈເດີ",
      "ຂາຍແທ້ບໍ",
      "ຂາຍແທ້ ຫຼື ຄອນເທັ້ນ",
      "ພໍ່ຄ້າຢູ່ແຂວງໃດ",
      "🤣",
      "😆",
      "😋",
      "🤔",
    ];

    const fakeUsers = [
      {
        name: "Khamlar Souvannavong",
        avatar:
          "/img/lar.jpg",
      },
      {
        name: "Thanousin Vongsahalart",
        avatar:
          "/img/sin.jpg",
      },
      {
        name: "K'Soukkunya Vong Pha Chanh",
        avatar:
          "/img/ya.jpg",
      },
      {
        name: "Vilaseth Vongsavath",
        avatar:
          "/img/do.jpg",
      },
      {
        name: "Ko Phanouvath",
        avatar:
          "/img/ko.jpg",
      },
      {
        name: "Saeng Pha Chanh KH",
        avatar:
          "/img/kop.jpg",
      },
      {
        name: "khamsavanh Vongsavath",
        avatar:
          "/img/n1.jpg",
      },
      {
        name: "Phoume linthong",
        avatar:
          "/img/n2.jpg",
      },
      {
        name: "Phoumy vilayvong",
        avatar:
          "/img/n3.jpg",
      },
      {
        name: "Khampheng Phommasack",
        avatar:
          "/img/n4.jpg",
      },
    ];

    const avatars = [
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    ];

    let commentId = 0;
    let viewerTimer: any;
    let commentTimer: any;

    const randomViewerUpdate = () => {
      setViewers((v) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(5, Math.min(18, v + change)); // จำกัด 3–7 คน
      });

      const nextUpdate = Math.floor(Math.random() * 3000) + 2000; // 2000–5000ms
      viewerTimer = setTimeout(randomViewerUpdate, nextUpdate);
    };

    const randomComment = () => {
      const chance = Math.random();

      // 💬 โอกาส 80% เท่านั้นที่จะคอมเมนต์
      if (chance < 0.8) {
        const user = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
        const newComment = {
          id: commentId++,
          name: user.name,
          avatar: user.avatar,
          message:
            fakeComments[Math.floor(Math.random() * fakeComments.length)],
        };

        setComments((prev) => {
          const newComments = [...prev, newComment];
          return newComments.slice(-8);
        });
      }

      // ⏱️ เวลาระหว่างคอมเมนต์: 6–12 วิ
      const nextComment = Math.floor(Math.random() * 6000) + 6000;
      commentTimer = setTimeout(randomComment, nextComment);
    };

    // เริ่มต้นยอดผู้ชมแบบสุ่ม 3–7
    setViewers(Math.floor(Math.random() * 5) + 3);

    randomViewerUpdate(); // เริ่มสุ่มยอดคนดู
    randomComment(); // เริ่มสุ่มคอมเมนต์
    startCamera();

    return () => {
      clearTimeout(viewerTimer);
      clearTimeout(commentTimer);
    };
  }, []);

  const commentsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (commentsRef.current) {
      commentsRef.current.scrollTop = commentsRef.current.scrollHeight;
    }
  }, [comments]);

  return (
    <div className="relative w-full max-w-[430px] mx-auto h-screen overflow-hidden bg-black shadow-lg">
      <div className="k text-white top-0 relative left-0 bottom-0 flex gap-1 m-2 z-100">
        <div className="k bg-[#dc2332] !text-[14px] rounded-[4px] px-1.5">
          สด
        </div>
        <div className="k flex items-center gap-1 bg-[#100f10] rounded-[4px] px-1.5">
          <div className="k !text-[12px]">
            <Eye color="#fff" size={14} />
          </div>
          <div className="k !text-[14px]">{viewers}</div>
        </div>
        <div className="k flex items-center gap-1 rounded-[4px] px-1">
          <div className="k !text-[12px]">
            <Globe color="#dbd7d6" size={14} />
          </div>
          <div className="k !text-[14px] text-[#dbd7d6]">สาธารณะ</div>
        </div>
      </div>

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full h-screen absolute top-0 object-cover transform -scale-x-100"
      />

      <div className="k absolute bottom-0 left-0 right-0">
        <div
          ref={commentsRef}
          className="k space-y-1 max-h-[300px] overflow-y-auto px-3 pb-2"
        >
          {comments.map((comment) => (
            <div key={comment.id} className="k flex gap-2 animate-fade-in">
              <div className="k bg-[#7e7e7e] overflow-hidden min-w-[34px] w-[34px] min-h-[34px] max-h-[34px] rounded-[50%]">
                <img
                  src={comment.avatar}
                  alt={comment.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="k bg-[#4d4f44]/50 rounded-[18px] px-2.5 py-1 text-white flex flex-col gap-0">
                <div className="k font-bold !text-[12px]">{comment.name}</div>
                <div className="k !text-[12px]">{comment.message}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="k flex items-center justify-between bg-[#161616] text-white px-3 py-3.5">
          <div className="k flex items-center gap-6">
            <div className="k">
              <Mic color="#fafafa" size={24} />
            </div>
            <div className="k">
              <MicVocal color="#fafafa" size={24} />
            </div>
            <div className="k">
              <SwitchCamera color="#fafafa" size={24} />
            </div>
            <div className="k">
              <Link color="#fafafa" size={24} />
            </div>
            <div className="k">
              <UserRoundPlus color="#fafafa" size={24} />
            </div>
            <div className="k">
              <Users color="#fafafa" size={24} />
            </div>
            <div className="k">
              <MessageCircle color="#fafafa" size={24} />
            </div>
          </div>
          <div className="k border-1 rounded-[3px] px-2 py-0.5 !text-[11px] font-bold">
            เสร็จสิ้น
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
