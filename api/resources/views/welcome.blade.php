@extends('layout.app')

@section('content')

    <main class="">
        <div class="position-relative overflow-hidden p-3 p-md-5 text-center bg-light">
            <div class="col-md-5 p-lg-5 mx-auto my-5">
                <h1 class="display-4 fw-normal">Kubeara</h1>
                <button class="btn btn-outline-secondary" id="pop" data-toggle="modal" data-target="#exampleModal">Sing
                    up
                </button>

                <button class="btn btn-outline-secondary" id="pop" data-toggle="modal" data-target="#exampleModalLogin">
                    Log in
                </button>
            </div>
            <div class="product-device shadow-sm d-none d-md-block"></div>
            <div class="product-device product-device-2 shadow-sm d-none d-md-block"></div>
        </div>

        <div class="d-md-flex flex-md-equal w-100 ps-md-3">
            <div class="bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
                <div class="my-3 py-3">
                    <h2 class="display-5">Another headline</h2>
                    <p class="lead">And an even wittier subheading.</p>
                </div>
                <div class="bg-light shadow-sm mx-auto"
                     style="width: 80%; height: 300px; border-radius: 21px 21px 0 0;"></div>
            </div>
            <div class="bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                <div class="my-3 p-3">
                    <h2 class="display-5">Another headline</h2>
                    <p class="lead">And an even wittier subheading.</p>
                </div>
                <div class="bg-dark shadow-sm mx-auto"
                     style="width: 80%; height: 300px; border-radius: 21px 21px 0 0;"></div>
            </div>
        </div>


        <div class="d-md-flex flex-md-equal w-100  ps-md-3">
            <div class="bg-white me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                <div class="my-3 p-3">
                    <h2 class="display-5">Another headline</h2>
                    <p class="lead">And an even wittier subheading.</p>
                </div>
                <div class="bg-light shadow-sm mx-auto"
                     style="width: 80%; height: 300px; border-radius: 21px 21px 0 0;"></div>
            </div>
            <div class="bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
                <div class="my-3 py-3">
                    <h2 class="display-5">Another headline</h2>
                    <p class="lead">And an even wittier subheading.</p>
                </div>
                <div class="bg-white shadow-sm mx-auto"
                     style="width: 80%; height: 300px; border-radius: 21px 21px 0 0;"></div>
            </div>
        </div>
    </main>


    <div class="modal fade" id="exampleModalLogin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLogin"
         aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header border-bottom-0">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form action="{{ action([\App\Http\Controllers\Controller::class, 'login']) }}" class="modal-body"
                      method="POST">
                    {{ csrf_field() }}
                    <div class="form-title text-center">
                        <h4>Login</h4>
                    </div>
                    <div class="d-flex flex-column text-center">
                        <div class="form-group">
                            <input type="text" name="domain" class="form-control"
                                   placeholder="Your domain">
                        </div>
                        <div class="form-group">
                            <input type="password" name="password" class="form-control" placeholder="Your placeholder">
                        </div>
                        <button type="submit" class="btn btn-info text-white btn-block btn-round">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header border-bottom-0">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form action="{{ action([\App\Http\Controllers\Controller::class, 'register']) }}" class="modal-body"
                      method="POST">
                    {{ csrf_field() }}
                    <div class="form-title text-center">
                        <h4>Inscription</h4>
                    </div>
                    <div class="d-flex flex-column text-center">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="text" name="name" class="form-control" id=""
                                           placeholder="Your name">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="text" name="email" class="form-control" id=""
                                           placeholder="Your email address">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="password" name="password" class="form-control" id=""
                                           placeholder="Your password">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="password" name="password_confirmation" class="form-control" id=""
                                           placeholder="Your confirmation password">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <input type="text" name="domain" class="form-control"
                                   placeholder="Your domain">
                        </div>
                        <button type="submit" class="btn btn-info text-white btn-block btn-round">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
