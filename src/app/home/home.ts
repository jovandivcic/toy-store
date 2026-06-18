import { Component, computed, signal } from "@angular/core";
import { ToyService } from "../../services/toy.service";
import { Router, RouterLink } from "@angular/router";
import { ToyModel } from "../../models/toy.model";
import { CartService } from "../../services/cart.service";

@Component({
  selector: "app-home",
  imports: [RouterLink],
  templateUrl: "./home.html",
  styleUrl: "./home.css",
})
export class Home {
  protected toys = signal<ToyModel[]>([]);

  protected nameFilter = signal<string>('');
  protected typeFilter = signal<string>('all');
  protected ageFilter = signal<string>('all');
  protected targetAudienceFilter = signal<string>('all');
  protected dateOfManufactureFilter = signal<string>('all');
  protected priceFilter = signal<string>('all');

  protected filteredToys = computed(() => {
    const name = this.nameFilter().trim().toLowerCase();
    const type = this.typeFilter();
    const age = this.ageFilter();
    const targetAudience = this.targetAudienceFilter();
    const dateOfManufacture = this.dateOfManufactureFilter();
    const price = this.priceFilter();

    return this.toys().filter(toy => {
      const matchesName =
        toy.name.toLowerCase().includes(name);

      const matchesType =
        type === 'all' || toy.type === type;

      const matchesAge =
        age === 'all' || toy.age === age;

      const matchesTargetAudience =
        targetAudience === 'all' || toy.targetAudience === targetAudience;

      const matchesDateOfManufacture =
        dateOfManufacture === 'all' ||
        Number(toy.dateOfManufacture) >= Number(dateOfManufacture);

      const matchesPrice =
        price === 'all' || toy.price < Number(price);

      return (
        matchesName &&
        matchesType &&
        matchesAge &&
        matchesTargetAudience &&
        matchesDateOfManufacture &&
        matchesPrice
      );
    });
  });

  constructor(protected router: Router) {
    ToyService.getToys()
      .then(rsp => this.toys.set(rsp.data));
  }

  protected updateNameFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.nameFilter.set(value);
  }

  protected updateTypeFilter(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.typeFilter.set(value);
  }

  protected updateAgeFilter(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.ageFilter.set(value);
  }

  protected updateTargetAudienceFilter(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.targetAudienceFilter.set(value);
  }

  protected updateDateOfManufactureFilter(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.dateOfManufactureFilter.set(value);
  }

  protected updatePriceFilter(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.priceFilter.set(value);
  }

  protected addToCart(toy: ToyModel) {
    try {
      CartService.addToCart(toy);
      alert("Toy added to cart");
    } catch (error) {
      alert("You must be logged in to reserve toys");
      this.router.navigate(['/login']);
    }
  }
}
