<div class="row">
    <!-- left column -->
    <div class="col-md-12">
        <!-- general form elements -->
        <div class="box box-primary">
            <div class="box-header">
                <h3 class="box-title">Rental Booking Request Form</h3>
            </div>
            <!-- /.box-header -->
            <!-- form start -->
            <form role="form" onsubmit="return postBookRequest();" data-toggle="validator" name="addBooking"  id="addBooking" enctype="multipart/form-data" method="post">
                <input type="hidden" name="_token" id="_token" value="">
                <input type="hidden" name="id" id="id">

                <div class="box-body">

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="first_name">First Name <span class="text-red">*</span></label>
                                <input type="text" name="first_name" id="first_name" value=""
                                       required="" class="form-control" placeholder="Enter first name">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="last_name">Last Name <span class="text-red">*</span></label>
                                <input type="text" name="last_name" value=""
                                       class="form-control" id="last_name" required="" placeholder="Enter last name">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="property_code">Property Code <span class="text-red">*</span></label>
                                <input type="text" name="property_code" value=""
                                       class="form-control property_code" id="property_code" autocomplete="off" required="" placeholder="Enter property code">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="other_property_code">Other Property Code(s) of interest</label>
                                <input type="text" name="other_property_code"
                                       value=""
                                       class="form-control" id="other_property_code"
                                       placeholder="Enter other property code">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="arrival_date">Booking Date Range <span class="text-red">*</span></label>
                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa fa-calendar"></i>
                                    </div>
                                    <input type="text" name="booking_date_range" value="" class="form-control pull-right" id="booking_date_range"/>
                                </div><!-- /.input group -->

                            </div>
                        </div>
                        <div class="col-md-6">

                        </div>
                    </div>
                    <div class="form-group">
                        <label for="address">Address <span class="text-red">*</span></label>
                        <input type="text" name="address" value="" class="form-control"
                               id="address" placeholder="Enter address">
                    </div>
                    <div class="form-group">
                        <label for="address2">Address Line 2</label>
                        <input type="text" name="address2" value="" class="form-control"
                               id="address2" placeholder="Enter address line 2">
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="city">City</label>
                                <input type="text" name="city" value="" class="form-control"
                                       id="city" placeholder="Enter city">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="province">State / Province / Region</label>
                                <input type="text" name="province" value=""
                                       class="form-control"
                                       id="province" placeholder="Enter province">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="zip">ZIP / Postal Code</label>
                                <input type="text" name="zip" value="" class="form-control" id="zip"
                                       placeholder="Enter zip/postal code">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="country">Country</label>
                                <input type="text" name="country" value="" class="form-control"
                                       id="country" placeholder="Enter country">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="email">Email <span class="text-red">*</span></label>
                        <input type="email" name="email" value="" class="form-control" id="email"
                               required="" placeholder="Enter email">
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="home_phone">Home Phone</label>
                                <input type="text" name="home_phone" value=""
                                       class="form-control"
                                       id="home_phone" placeholder="Enter home phone number">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="business_phone">Business Phone</label>
                                <input type="text" name="business_phone" value=""
                                       class="form-control" id="business_phone"
                                       placeholder="Enter business phone number">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="num_adults">Number of Adults <span class="text-red">*</span></label>
                                <input type="text" name="num_adults" value=""
                                       class="form-control"
                                       id="num_adults" required="" placeholder="Enter number of adults">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="num_children">Number of Children <span class="text-red">*</span></label>
                                <input type="text" name="num_children" value=""
                                       class="form-control" id="num_children" required=""
                                       placeholder="Enter number of children">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="pets">Pets <span class="text-red">*</span></label>
                        <select id="pets" name="pets" class="form-control" required="">
                            <option value="">Choose One</option>
                            <option value="No Pets">No Pets</option>
                            <option value="Cat(s)">Cat(s)</option>
                            <option value="Dog(s)">Dog(s)</option>
                            <option value="Cat(s) and Dog(s)">Cat(s) and Dog(s)</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Describe Pets that will be at the unit including age(s), type, size and
                            breed.</label>
			<textarea name="pets_description" id="pets_description" class="form-control" rows="3"
                      placeholder="Enter ..."></textarea>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="is_smoker">Smokers <span class="text-red">*</span></label>
                                <select id="is_smoker" name="is_smoker" class="form-control" required="">
                                    <option value="">Choose One</option>
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>

                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="num_smokers">If yes, how many smokers?</label>
                                <input type="text" name="num_smokers" value=""
                                       class="form-control"
                                       id="num_smokers" placeholder="Enter number of smokers">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="rental_price_total">Rental Price Total</label>
                                <input type="text" name="rental_price_total" value=""
                                       class="form-control"
                                       id="rental_price_total" placeholder="Rental price">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="deposit">Deposit</label>
                                <input type="text" name="deposit" value=""
                                       class="form-control" id="deposit"
                                       placeholder="Deposit">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Questions or Comments</label>
			<textarea name="comments" id="comments" class="form-control" rows="3"
                      placeholder="Enter ..."></textarea>
                    </div>

                </div>
                <!-- /.box-body -->

                <div class="box-footer">

                    <button type="submit" class="btn btn-primary" >Submit</button>

                </div>
            </form>
        </div>
        <!-- /.box -->
    </div>
</div><!-- /.row -->