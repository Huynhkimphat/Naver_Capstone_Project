import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import AllProductPage from "../product"

const styles = {
    wrapper: "mx-auto",
};

export default function ProductByCategory() {
    const router = useRouter();

    return <AllProductPage title={router.query.slug}/>;
}
