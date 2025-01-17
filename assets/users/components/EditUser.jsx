import React from 'react';
import PropTypes from 'prop-types';
import TextInput from 'components/TextInput';
import SelectInput from 'components/SelectInput';
import CheckboxInput from 'components/CheckboxInput';
import AuditInformation from 'components/AuditInformation';

import {gettext} from 'utils';
import {isUserAdmin, getUserTypes, getUserLabel, userTypeReadOnly, getLocaleInputOptions, getDefaultLocale} from '../utils';

const getCompanyOptions = (companies) => companies.map(company => ({value: company._id, text: company.name}));

function EditUser({user, onChange, errors, companies, onSave, onResetPassword, onClose, onDelete, currentUser}) {
    const localeOptions = getLocaleInputOptions();

    return (
        <div className='list-item__preview' role={gettext('dialog')} aria-label={gettext('Edit User')}>
            <div className='list-item__preview-header'>
                <h3>{ gettext('Add/Edit User') }</h3>
                <button
                    id='hide-sidebar'
                    type='button'
                    className='icon-button'
                    data-dismiss='modal'
                    aria-label={gettext('Close')}
                    onClick={onClose}>
                    <i className="icon--close-thin icon--gray" aria-hidden='true'></i>
                </button>
            </div>
            <AuditInformation item={user} />
            <form>
                <div className="list-item__preview-form">
                    <TextInput
                        name='first_name'
                        label={gettext('First Name')}
                        value={user.first_name}
                        onChange={onChange}
                        error={errors ? errors.first_name : null} />

                    <TextInput
                        name='last_name'
                        label={gettext('Last Name')}
                        value={user.last_name}
                        onChange={onChange}
                        error={errors ? errors.last_name : null} />

                    <TextInput
                        name='email'
                        label={gettext('Email')}
                        value={user.email}
                        onChange={onChange}
                        error={errors ? errors.email : null} />

                    <TextInput
                        name='phone'
                        label={gettext('Phone')}
                        value={user.phone}
                        onChange={onChange}
                        error={errors ? errors.phone : null} />

                    <TextInput
                        name='mobile'
                        label={gettext('Mobile')}
                        value={user.mobile}
                        onChange={onChange}
                        error={errors ? errors.mobile : null} />

                    <TextInput
                        name='role'
                        label={gettext('Role')}
                        value={user.role}
                        onChange={onChange}
                        error={errors ? errors.role : null} />
                    <SelectInput
                        name='user_type'
                        label={gettext('User Type')}
                        value={user.user_type}
                        options={userTypeReadOnly(user, currentUser) ? [] : getUserTypes(currentUser) }
                        defaultOption={userTypeReadOnly(user, currentUser) ? getUserLabel(user.user_type) : null}
                        readOnly={userTypeReadOnly(user, currentUser)}
                        onChange={onChange}
                        error={errors ? errors.user_type : null}/>
                    <SelectInput
                        name='company'
                        label={gettext('Company')}
                        value={user.company}
                        defaultOption={''}
                        options={getCompanyOptions(companies)}
                        onChange={onChange}
                        error={errors ? errors.company : null} />

                    {!localeOptions.length ? null : (
                        <SelectInput
                            name={'locale'}
                            label={gettext('Language')}
                            value={user.locale}
                            onChange={onChange}
                            options={localeOptions}
                            defaultOption={getDefaultLocale()}
                            error={errors ? errors.locale : null}
                        />
                    )}

                    <CheckboxInput
                        name='is_approved'
                        label={gettext('Approved')}
                        value={user.is_approved}
                        onChange={onChange} />

                    <CheckboxInput
                        name='is_enabled'
                        label={gettext('Enabled')}
                        value={user.is_enabled}
                        onChange={onChange} />

                    <CheckboxInput
                        name='expiry_alert'
                        label={gettext('Company Expiry Alert')}
                        value={user.expiry_alert}
                        onChange={onChange} />

                    <CheckboxInput
                        name='manage_company_topics'
                        label={gettext('Manage Company Topics')}
                        value={user.manage_company_topics}
                        onChange={onChange}
                    />

                </div>

                <div className='list-item__preview-footer'>
                    {user._id ?
                        <input
                            type='button'
                            className='btn btn-outline-secondary'
                            value={gettext('Reset Password')}
                            id='resetPassword'
                            onClick={onResetPassword} /> : null}

                    <input
                        type='button'
                        className='btn btn-outline-primary'
                        value={gettext('Save')}
                        onClick={onSave} />

                    {user._id && isUserAdmin(currentUser) && (user._id !== currentUser._id) && <input
                        type='button'
                        className='btn btn-outline-primary'
                        value={gettext('Delete')}
                        onClick={onDelete} />}
                </div>


            </form>
        </div>
    );
}

EditUser.propTypes = {
    user: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    errors: PropTypes.object,
    companies: PropTypes.arrayOf(PropTypes.object),
    onSave: PropTypes.func.isRequired,
    onResetPassword: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    currentUser: PropTypes.object,
};

export default EditUser;
