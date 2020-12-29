import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {PublicService} from '../../services';
import {ToastrService} from 'ngx-toastr';
import {HelpersService} from '../../../shared/services/helpers/helpers.service';
import {AuthService} from '../../../shared/services';


@Component({
  selector: 'app-website-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {


  private destroy$: Subject<boolean> = new Subject<boolean>();
  public showSign: any;
  public showLogin: any;
  public loginForm: FormGroup;

  public registerForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private to: ToastrService,
    private api: HttpClient,
    private auth: AuthService,
    private publicService: PublicService,
    private router: Router) {
    console.log('ici');
  }

  public ngOnInit() {

    this.loginForm = this.fb.group({
      domain: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });

    this.registerForm = this.fb.group({
      name: [null],
      password: [null],
      password_confirmation: [null],
      email: [null],
      domain: [null],
    });
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit() {
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});
    // console.log(this.registerForm.value);
    this.publicService.register(this.registerForm.value).subscribe((data) => {
      console.log(data);
      this.showSign = false;
    });
  }

  onSubmitLogin() {
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});
    // console.log(this.registerForm.value);
    this.publicService.login(this.loginForm.value).subscribe((data) => {

      AuthService.setToken(data.token.plainTextToken);
      this.auth.getUser().subscribe((dataSub) => {
        console.log(dataSub);
        this.router.navigateByUrl('/app');
        this.showLogin = false;
        this.to.success('Connexion réussi ! ');
      });
    });
  }
}
