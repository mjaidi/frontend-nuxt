export default ({ store, route, redirect, error }) => {
  // Check if user is connected first
  if (!store.state.auth) return redirect("/");

  // Get authorizations for matched routes (with children routes too)
  const authorizedRoles = route.meta.map(meta => {
    if (meta.roles) return meta.roles;
    return null;
  });
  if (!authorizedRoles[0].includes(store.state.auth.user.role)) {
    error("You are not authorized");
    console.log(error);
    redirect("/");
  }
};
