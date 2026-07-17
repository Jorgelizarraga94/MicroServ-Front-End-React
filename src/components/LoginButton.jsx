import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>Iniciar Sesión</button>
      ) : (
        <>
          <p>Hola, {user.name}</p>
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Cerrar Sesión
          </button>
        </>
      )}
    </div>
  );
};