import { Link, Route, Routes } from "react-router-dom";

// Auto generates routes from files under ./posts
// https://vitejs.dev/guide/features.html#glob-import
const posts = import.meta.glob("./posts/*.tsx", { eager: true });

const routes = Object.keys(posts).map((path) => {
  const name = path.match(/\.\/posts\/(.*)\.tsx$/)![1];
  return {
    name,
    path: name === "Home" ? "/" : `/${name.toLowerCase()}`,
    //@ts-ignore
    component: posts[path]!.default,
  };
});
console.log({ routes });

export default function App() {
  return (
    <>
      <nav>
        <ul>
          {routes.map(({ name, path }) => {
            return (
              <li key={path}>
                <Link to={path}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <Routes>
        {routes.map(({ path, component: RouteComp }) => {
          return <Route key={path} path={path} element={<RouteComp />}></Route>;
        })}
      </Routes>
    </>
  );
}
