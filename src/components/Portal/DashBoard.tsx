import TopMovieContextProvier from "contexts/TopMovieContext";
import AuthContextProvider from "contexts/AuthContext";
import MovieContextProvider from "contexts/MovieContext";
import ThemeContextProvider from "contexts/ThemeContext";
import ProgressContextProvider from "contexts/ProgressContext";
import { Navigation } from "components/Shared/Navigation";
import Footer from "components/Shared/Footer";

function DashBoard() {
  return (
    <div>
      <TopMovieContextProvier>
        <AuthContextProvider>
          <MovieContextProvider>
            <ThemeContextProvider>
              <ProgressContextProvider>
                <Navigation />
                <Footer />
              </ProgressContextProvider>
            </ThemeContextProvider>
          </MovieContextProvider>
        </AuthContextProvider>
      </TopMovieContextProvier>
    </div>
  );
}

export default DashBoard;
