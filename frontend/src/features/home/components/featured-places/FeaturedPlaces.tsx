import Container from "@/components/layout/Container";
import PlaceGrid from "@/features/places/components/PlaceGrid";
import {usePlaces} from "@/features/places/hooks/usePlace";
import {Loader2, MapIcon} from "lucide-react";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {SectionTitle} from "@/components/common";

const FeaturedPlaces = () => {
    const {data: places = [], isLoading} = usePlaces();
    const featured = places.slice(0, 6);

    return (
        <section className="py-16 md:py-24">
            <Container>
                <div className="mb-12 text-center">
                    <SectionTitle title={'محبوب‌ترین مکان‌ها'} description={'بازدید از معروف‌ترین جاذبه‌های ایران'} />
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                ) : featured.length === 0 ? (
                    <div className="flex flex-col items-center gap-4 py-12 text-center">
                        <MapIcon className="h-16 w-16 text-muted-foreground/40" />
                        <p className="text-muted-foreground">هنوز هیچ مکانی اضافه نشده است</p>
                        <Button asChild variant="outline">
                            <Link to="/places">مشاهده همه مکان‌ها</Link>
                        </Button>
                    </div>
                ) : (
                    <PlaceGrid places={featured} />
                )}
            </Container>
        </section>
    );
};

export default FeaturedPlaces;
