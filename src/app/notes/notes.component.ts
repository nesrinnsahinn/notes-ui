import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteService, Note } from '../core/note.service';
import { Router } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';


@Component({
    selector: 'app-notes',
    standalone: true,
    imports: [CommonModule, FormsModule, AngularEditorModule],
    template: `
    <div style="display:flex; gap:16px; padding:8px;">
      <!-- Sol: Not listesi -->
      <aside style="width:260px; border-right:1px solid #ddd; padding-right:12px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <h3 style="margin:0;">Notlar</h3>
          <button (click)="newNote()">+ Yeni</button>
        </div>

        <ul *ngIf="notes.length; else emptyTpl" style="list-style:none; padding:0; margin:0;">
          <li *ngFor="let n of notes; let i = index"
          (click)="select(n)"
          [style.fontWeight]="selected?.id===n.id ? '700' : '400'"
          style="cursor:pointer; padding:6px 4px;">
          {{ i + 1 }} — {{ n.title }}
          </li>
        </ul>
        <ng-template #emptyTpl><p>Hiç not yok.</p></ng-template>

        <button (click)="logout()" style="margin-top:12px;">Çıkış</button>
      </aside>

      <!-- Sağ: Düzenleme alanı -->
      <section style="flex:1;">
        <ng-container *ngIf="editing; else pickTpl">
          <label>Başlık</label>
          <input [(ngModel)]="draftTitle" style="display:block; width:100%; margin:6px 0 12px 0;" />
          <label>İçerik</label>
<angular-editor [(ngModel)]="draftBody" [placeholder]="'İçeriği buraya yazın'"></angular-editor>

          <div style="display:flex; gap:8px;">
            <button (click)="save()" [disabled]="!draftTitle.trim()">Kaydet</button>
            <button (click)="cancel()">İptal</button>
            <button *ngIf="selected?.id" (click)="remove()" style="margin-left:auto;">Sil</button>
          </div>
        </ng-container>
        <ng-template #pickTpl>
          <p>Soldan bir not seçin ya da “Yeni” deyin.</p>
        </ng-template>
      </section>
    </div>
  `
})
export class NotesComponent implements OnInit {
    notes: Note[] = [];
    selected: Note | null = null;
    draftTitle = '';
    editing = false;
    draftBody = ''; // WYSIWYG içeriği 


    constructor(private notesSvc: NoteService, private router: Router) { }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.notesSvc.getAll().subscribe({
            next: (data) => this.notes = data,
            error: () => alert('Notlar alınamadı (401 olabilir).')
        });
    }

    select(n: Note) {
        this.selected = n;
        this.draftTitle = n.title;
        this.draftBody = n.content || '';
        this.editing = true;
    }


    newNote() {
        this.selected = null;
        this.draftTitle = '';
        this.draftBody = '';
        this.editing = true;
    }

    cancel() {
        this.editing = false;
        this.draftTitle = '';
        this.selected = null;
    }

    save() {
        const title = this.draftTitle.trim();
        const content = this.draftBody;
        if (!title) return;

        if (this.selected?.id) {
            this.notesSvc.update(this.selected.id, title, content).subscribe({
                next: (u) => {
                    const i = this.notes.findIndex(x => x.id === u.id);
                    if (i > -1) this.notes[i] = u;
                    this.select(u);
                },
                error: () => alert('Güncelleme başarısız.')
            });
        } else {
            this.notesSvc.create(title, content).subscribe({
                next: (c) => {
                    this.notes = [c, ...this.notes];
                    this.select(c);
                },
                error: () => alert('Oluşturma başarısız.')
            });
        }
    }


    remove() {
        if (!this.selected?.id) return;
        if (!confirm('Bu not silinsin mi?')) return;

        const id = this.selected.id;
        this.notesSvc.remove(id).subscribe({
            next: () => {
                this.notes = this.notes.filter(n => n.id !== id);
                this.cancel();
            },
            error: () => alert('Silme başarısız.')
        });
    }

    logout() {
        localStorage.removeItem('authToken');
        this.router.navigateByUrl('/login');
    }
}
