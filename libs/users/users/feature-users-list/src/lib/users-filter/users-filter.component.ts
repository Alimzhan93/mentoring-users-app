import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'users-filter',
  standalone: true,
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
  ],
})
export class UsersFilterComponent implements OnInit {
  private readonly fb: FormBuilder = inject(FormBuilder);
  public filterForm!: FormGroup;
  @Output()
  private applyFilterEmit: EventEmitter<{ filter: { name: string } }> = new EventEmitter<{
    filter: { name: string };
  }>();

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      name: [''],
    });

    this.filterForm.get('name')?.valueChanges.pipe(
      debounceTime(300) 
    ).subscribe(value => {
      this.applyFilterEmit.emit({ filter: { name: value } });
    });
  }

  public applyFilter(): void {
    const filterValue: { filter: { name: string } } = {
      filter: {
        name: this.filterForm.value.name,
      },
    };
    this.applyFilterEmit.emit(filterValue);
  }
}
