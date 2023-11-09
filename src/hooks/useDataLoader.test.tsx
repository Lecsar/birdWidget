import { render, screen } from "@testing-library/react";
import { useDataLoader } from "./useDataLoader";

const DataLoaderTestComponent = ({ api }: { api: () => Promise<any> }) => {
  const result = useDataLoader(api);

  if (result.loading === "loading") {
    return <div>Loading...</div>;
  }

  if (result.error) {
    return <div>Error!</div>;
  }

  if (result.loading === "success") {
    return <div>Data loaded</div>;
  }

  return <div>Idle</div>;
};

describe("useDataLoader", () => {
  it("should render the loading state initially", () => {
    const mockApi = () => new Promise(() => {});
    render(<DataLoaderTestComponent api={mockApi} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render the success state", async () => {
    const mockApi = () => Promise.resolve("Data loaded");
    render(<DataLoaderTestComponent api={mockApi} />);
    await screen.findByText("Data loaded");
  });

  it("should render the error state", async () => {
    const mockApi = () => Promise.reject(new Error("Error!"));
    render(<DataLoaderTestComponent api={mockApi} />);
    await screen.findByText("Error!");
  });
});
