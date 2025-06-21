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
      "สนใจค่ะ",
      "ราคาเท่าไหร่คะ",
      "มีสีอื่นไหม",
      "CF ค่ะ",
      "สวยมากเลยพี่!",
      "น่าซื้อจัง",
      "ลดราคาไหมคะ",
      "ส่งกรุงเทพไหม",
      "เก็บเงินปลายทางไหม",
      "มีไซส์ M ไหมคะ",
      "โอเค ซื้อเลย",
      "แพงไป",
      "ถูกมากเลย",
      "คุณภาพดีไหม",
    ];

    const fakeNames = [
      "Thanousin Vongsahalart",
      "Khamlar Souvannavong",
      "Suea Phonexay",
      "Vilaseth Thongphayvan",
    ];

    const avatars = [
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    ];

    let commentId = 0;

    const interval = setInterval(() => {
      setViewers((v) => v + Math.floor(Math.random() * 3));

      if (Math.random() > 0.3) {
        const newComment = {
          id: commentId++,
          name: fakeNames[Math.floor(Math.random() * fakeNames.length)],
          message:
            fakeComments[Math.floor(Math.random() * fakeComments.length)],
          avatar: avatars[Math.floor(Math.random() * avatars.length)],
        };

setComments((prevComments) => {
  const newComments = [...prevComments, newComment]; // เปลี่ยนจาก [newComment, ...prevComments]
  return newComments.slice(-8); // เปลี่ยนจาก slice(0, 8) เป็น slice(-8) เพื่อเก็บ 8 ตัวท้าย
});
      }
    }, 2000);

    startCamera();

    return () => clearInterval(interval);
  }, []);
  const commentsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
  if (commentsRef.current) {
    commentsRef.current.scrollTop = commentsRef.current.scrollHeight;
  }
}, [comments]);

  return (
    <div className="relative w-full max-w-[400px] mx-auto h-screen overflow-hidden bg-black shadow-lg">
      <div className="k text-white top-0 relative left-0 bottom-0 flex gap-1 m-2 z-100">
        <div className="k bg-[#dc2332] !text-[12px] rounded-[4px] px-1.5">
          สด
        </div>
        <div className="k flex items-center gap-1 bg-[#100f10] rounded-[4px] px-1.5">
          <div className="k !text-[12px]">
            <Eye color="#fff" size={12} />
          </div>
          <div className="k !text-[12px]">{viewers}</div>
        </div>
        <div className="k flex items-center gap-1 rounded-[4px] px-1">
          <div className="k !text-[12px]">
            <Globe color="#dbd7d6" size={12} />
          </div>
          <div className="k !text-[12px] text-[#dbd7d6]">สาธารณะ</div>
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
        <div ref={commentsRef} className="k space-y-1 max-h-[300px] overflow-y-auto px-3 pb-2">
          {comments.map((comment) => (
            <div key={comment.id} className="k flex gap-2 animate-fade-in">
              <div className="k bg-[#7e7e7e] overflow-hidden min-w-[34px] w-[34px] min-h-[34px] max-h-[34px] rounded-[50%]">
                <img
                  src={comment.avatar}
                  alt={comment.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="k bg-[#4d4f44]/70 rounded-[18px] px-2.5 py-1 text-white flex flex-col gap-0">
                <div className="k font-bold !text-[12px]">{comment.name}</div>
                <div className="k !text-[12px]">{comment.message}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="k flex items-center justify-between bg-[#161616] text-white px-3 py-3.5">
          <div className="k flex gap-6">
            <div className="k">
              <Mic color="#fafafa" size={21} />
            </div>
            <div className="k">
              <MicVocal color="#fafafa" size={21} />
            </div>
            <div className="k">
              <SwitchCamera color="#fafafa" size={21} />
            </div>
            <div className="k">
              <Link color="#fafafa" size={21} />
            </div>
            <div className="k">
              <UserRoundPlus color="#fafafa" size={21} />
            </div>
            <div className="k">
              <Users color="#fafafa" size={21} />
            </div>
            <div className="k">
              <MessageCircle color="#fafafa" size={21} />
            </div>
          </div>
          <div className="k border-1 rounded-[3px] px-2 py-0.5 !text-[10px] font-bold">
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
