export interface frined {
  id: string;
  name: string;
}

interface FirebaseTimeStamp {
  seconds: number;
  nanoseconds: number;
}

export interface Message {
  from: string;
  msg: string;
  createAt: FirebaseTimeStamp;
}
