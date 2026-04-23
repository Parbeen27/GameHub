import Home from "../Pages/user/Home"
import Game from "../Pages/user/Game"
import LeaderboardPage from "../Pages/user/Leaderboard"
import Dashboard from "../Pages/admin/Dashboard"
import Users from "../Pages/admin/Users"
import Login from "../Pages/common/Login"
import SignUp from "../Pages/common/SignUp"
import About from "../Pages/common/About"
import Profile from "../Pages/user/Profile"
import Unauthorized from "../Pages/common/Unauthorized"
import ProfileStats from "../Pages/user/ProfileStats"
import Games from "../Pages/admin/Games"
import AnalystDashboard from "../Pages/analyst/AnalystDashboard"
import AnalystUsers from "../Pages/analyst/AnalystUsers"
import AnalystGames from "../Pages/analyst/AnalystGames"
import AnalystLeaderboard from "../Pages/analyst/AnalystLeaderboard"

export const routes = [
    {
        path: "/",
        element: Home ,
        roles: ["user"],
        layout: "user",
    },
    {
        path: "/game/:id",
        element: Game,
        roles: ["user"],
        layout: "user",
    },
    {
        path: "/user/profile",
        element: Profile,
        role: ["user"],
        layout: "user"
    },
    {
        path: "/leaderboard",
        element: LeaderboardPage,
        roles: ["user"],
        layout: "user",
    },
    {
        path: "/user/profilestats",
        element: ProfileStats,
        roles: ["user"],
        layout: "user",
    },
    {
        path: "/admin/dashboard",
        element: Dashboard,
        roles: ["admin"],
        layout: "admin",
    },
    {
        path: "/admin/users",
        element: Users,
        roles: ["admin"],
        layout: "admin",
    },
    {
        path: "/admin/games",
        element: Games,
        roles: ["admin"],
        layout: "admin",
    },
    {
        path: "/analyst/dashboard",
        element: AnalystDashboard,
        role: ["analyst"],
        layout:"analyst"
    },
    {
        path: "/analyst/users",
        element: AnalystUsers,
        role: ["analyst"],
        layout:"analyst"
    },
    {
        path: "/analyst/games",
        element: AnalystGames,
        role: ["analyst"],
        layout:"analyst"
    },
    {
        path: "/analyst/leaderboard",
        element: AnalystLeaderboard,
        role: ["analyst"],
        layout:"analyst"
    },
    {
        path: "/login",
        element: Login,
        public: true
    },
    {
        path: "/signup",
        element: SignUp,
        public: true
    },
    {
        path: "/about",
        element: About,
        layout:"user"
    },
    {
        path: "/unauthorized",
        element: Unauthorized,
        public: true
    },
];