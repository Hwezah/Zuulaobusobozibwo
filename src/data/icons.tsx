import type { ComponentType } from "react";
import {
  PiMicrophoneStage,
  PiStar,
  PiGraduationCap,
  PiTicket,
  PiUsersThree,
  PiWaveform,
  PiBooks,
  PiBuildings,
  PiCamera,
  PiChurch,
  PiDiamond,
  PiPlant,
  PiHeart,
  PiCrown,
  PiPhone,
  PiEnvelopeSimple,
  PiMapPin,
  PiPaperPlaneTilt,
} from "react-icons/pi";

export type IconKey =
  | "mic"
  | "star"
  | "cap"
  | "ticket"
  | "users"
  | "wave"
  | "books"
  | "building"
  | "camera"
  | "church"
  | "diamond"
  | "sprout"
  | "heart"
  | "crown"
  | "phone"
  | "mail"
  | "pin"
  | "send";

type IconProps = { className?: string; size?: number };

/** Maps the prototype's icon keys to the modern Phosphor icon set. */
export const ICONS: Record<IconKey, ComponentType<IconProps>> = {
  mic: PiMicrophoneStage,
  star: PiStar,
  cap: PiGraduationCap,
  ticket: PiTicket,
  users: PiUsersThree,
  wave: PiWaveform,
  books: PiBooks,
  building: PiBuildings,
  camera: PiCamera,
  church: PiChurch,
  diamond: PiDiamond,
  sprout: PiPlant,
  heart: PiHeart,
  crown: PiCrown,
  phone: PiPhone,
  mail: PiEnvelopeSimple,
  pin: PiMapPin,
  send: PiPaperPlaneTilt,
};
