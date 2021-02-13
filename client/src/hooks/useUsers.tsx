import React from "react";

import colors from "../components/LetterAvatar/colors";

export interface Users {
  [key: string]: string;
}

export default function useUsers() {
  const [users, setUsers] = React.useState<Users>({});

  const update = (usersNames: string[]) => {
    const newUsers: Users = {};

    for (const name of usersNames) {
      if (
        name.length < 3 ||
        Object.keys(newUsers).length >= Number(process.env.MAX_USERS)
      )
        continue;

      const unusedColors = [...Object.values(colors)].filter(
        (color) => !Object.values(newUsers).includes(color)
      );

      newUsers[name] =
        unusedColors.length > 0 ? unusedColors[0] : Object.values(colors)[0];
    }

    setUsers(newUsers);
  };

  return { users, update };
}
