export interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  createdAt: Date;
  clearanceLevel: number;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  RESEARCHER = 'RESEARCHER',
  AGENT = 'AGENT',
  READER = 'READER',
}

export interface SCEObject {
  id: string;
  number: string;
  name: string;
  classification: Classification;
  containmentClass: ContainmentClass;
  disruptionClass: DisruptionClass;
  riskClass: RiskClass;
  description: string;
  specialContainmentProcedures: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
}

export enum Classification {
  SAFE = 'SAFE',
  EUCLID = 'EUCLID',
  KETER = 'KETER',
  THAUMIEL = 'THAUMIEL',
  NEUTRALIZED = 'NEUTRALIZED',
  APOLLYON = 'APOLLYON',
  ARCHON = 'ARCHON',
  UNCLASSIFIED = 'UNCLASSIFIED',
}

export enum ContainmentClass {
  SAFE = 'SAFE',
  EUCLID = 'EUCLID',
  KETER = 'KETER',
  NEUTRALIZED = 'NEUTRALIZED',
  PENDING = 'PENDING',
  EXPLAINED = 'EXPLAINED',
  ESOTERIC = 'ESOTERIC',
}

export enum DisruptionClass {
  DARK = 'DARK',
  VLAM = 'VLAM',
  KENEQ = 'KENEQ',
  EKHI = 'EKHI',
  AMIDA = 'AMIDA',
}

export enum RiskClass {
  NOTICE = 'NOTICE',
  CAUTION = 'CAUTION',
  WARNING = 'WARNING',
  DANGER = 'DANGER',
  CRITICAL = 'CRITICAL',
}

export interface News {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Report {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
  status: ReportStatus;
}

export enum ReportStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface Position {
  id: string;
  name: string;
  description: string;
  clearanceLevel: number;
}

export interface RegistrationRequest {
  id: string;
  email: string;
  username: string;
  status: RegistrationStatus;
  createdAt: Date;
}

export enum RegistrationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
