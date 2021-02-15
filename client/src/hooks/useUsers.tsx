import React from "react";

import colors from "../components/LetterAvatar/colors";

export interface Users {
  [key: string]: { color: string; unreadMessages: boolean };
}

export default function useUsers() {
  const [users, setUsers] = React.useState<Users>({});

  const setUnreadMessages = (name: string, state: boolean) => {
    if (users[name]) {
      users[name].unreadMessages = state;
      setUsers({ ...users });
    }
  };

  const clear = () => setUsers({});

  const update = (usersNames: string[]) => {
    const newUsers: Users = { ...users };

    for (const name of Object.keys(newUsers))
      if (!usersNames.includes(name)) delete newUsers[name];

    for (const name of usersNames) {
      if (
        name in newUsers ||
        name.length < 3 ||
        Object.keys(newUsers).length >= Number(process.env.MAX_USERS)
      )
        continue;

      const usedColors: string[] = [];
      for (const user of Object.values(newUsers)) usedColors.push(user.color);

      const unusedColors = Object.values(colors).filter(
        (color) => !usedColors.includes(color)
      );

      newUsers[name] = {
        color:
          unusedColors.length > 0 ? unusedColors[0] : Object.values(colors)[0],
        unreadMessages: false
      };
    }

    setUsers(newUsers);
  };

  return { users, update, clear, setUnreadMessages };
}
