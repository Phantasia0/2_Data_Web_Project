import { User } from "../db/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class userService {
  static async addUser({ id, nickname, password }) {
    // ID 중복 확인
    const idChecked = await User.findByOne({ id });
    if (idChecked) {
      const errorMessage = "사용중인 ID입니다. 다른 ID를 입력해 주세요.";
      return { errorMessage };
    }

    // 닉네임 중복 확인
    const nicknameChecked = await User.findByOne({ nickname });
    if (nicknameChecked) {
      const errorMessage =
        "사용중인 닉네임입니다. 다른 닉네임을 입력해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    // id 는 유니크 값 부여
    const newUser = { id, nickname, password: hashedPassword };

    // db에 저장
    const createdNewUser = await User.create({ newUser });
    createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewUser;
  }

  static async getUser({ id, password }) {
    // 이메일 db에 존재 여부 확인
    const user = await User.findByOne({ id });
    if (!user) {
      const errorMessage = "해당 ID는 가입이력이 없습니다.";
      return { errorMessage };
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ _id: user._id }, secretKey);

    // 반환할 loginuser 객체를 위한 변수 설정
    const _id = user._id;
    const nickname = user.nickname;
    const description = user.description;
    const level = user.level;

    const loginUser = {
      token,
      _id,
      nickname,
      description,
      level,
      errorMessage: null,
    };

    return loginUser;
  }

  static async getUserInfo(_id) {
    const user = await User.findByOne({ _id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage = "해당 ID는 가입이력이 없습니다.";
      return { errorMessage };
    }

    return user;
  }

  // static async getUsers() {
  //   const users = await User.findAll();
  //   return users;
  // }

  // static async setUser({ user_id, toUpdate }) {
  //   // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
  //   let user = await User.findById({ user_id });

  //   // db에서 찾지 못한 경우, 에러 메시지 반환
  //   if (!user) {
  //     const errorMessage = "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
  //     return { errorMessage };
  //   }

  //   // 업데이트 대상에 name이 있다면, 즉 name 값이 null 이 아니라면 업데이트 진행
  //   if (toUpdate.name) {
  //     const fieldToUpdate = "name";
  //     const newValue = toUpdate.name;
  //     user = await User.update({ user_id, fieldToUpdate, newValue });
  //   }

  //   if (toUpdate.email) {
  //     const fieldToUpdate = "email";
  //     const newValue = toUpdate.email;
  //     user = await User.update({ user_id, fieldToUpdate, newValue });
  //   }

  //   if (toUpdate.password) {
  //     const fieldToUpdate = "password";
  //     const newValue = bcrypt.hash(toUpdate.password, 10);
  //     user = await User.update({ user_id, fieldToUpdate, newValue });
  //   }

  //   if (toUpdate.description) {
  //     const fieldToUpdate = "description";
  //     const newValue = toUpdate.description;
  //     user = await User.update({ user_id, fieldToUpdate, newValue });
  //   }

  //   return user;
  // }
}

export { userService };
